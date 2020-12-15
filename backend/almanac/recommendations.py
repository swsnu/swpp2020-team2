'''
a standard docstring
'''

import heapq
import operator
from sklearn.feature_extraction.text import CountVectorizer, TfidfTransformer
from sklearn.pipeline import Pipeline
from sklearn.multiclass import OneVsRestClassifier
from sklearn.svm import SVC
from sklearn.preprocessing import MultiLabelBinarizer
from .models import Event, Tag

clf_ovr = Pipeline([('vect', CountVectorizer(stop_words='english',max_features=7000,max_df=.15)),
                ('tfidf', TfidfTransformer(use_idf=True)),
                ('clf', OneVsRestClassifier(SVC(kernel='linear')))])

def recommend_tag(content, num=3):

    '''
    a function docstring
    '''

    int_to_tag = []
    tag_to_int = {}
    idx = 1

    for t_id in Tag.objects.values_list('id', flat=True):
        int_to_tag.append(t_id)
        tag_to_int[t_id] = idx
        idx += 1

    events = [{
        'content': e.content, 'tag': e.tag.values_list('id', flat=True)
        } for e in Event.objects.prefetch_related('tag').order_by('-date')]

    train_data = [event['content'] for event in events[:100]]
    train_target = [[tag_to_int[t] for t in event['tag']] for event in events]
    if train_data:
        clf_ovr.fit(train_data, MultiLabelBinarizer().fit_transform(train_target))

    predicted = clf_ovr.decision_function([content])
    pre_result = list(zip(
        *heapq.nlargest(num, enumerate(predicted[0]), key=operator.itemgetter(1))
    ))[0]
    result = list(map(lambda x: int_to_tag[x], pre_result))
    return result
