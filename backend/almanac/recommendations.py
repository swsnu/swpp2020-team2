'''
a standard docstring
'''

import heapq
import operator
from django.db.models import Count
from sklearn.feature_extraction.text import CountVectorizer, TfidfTransformer
from sklearn.pipeline import Pipeline
from sklearn.multiclass import OneVsRestClassifier
from sklearn.svm import SVC
from sklearn.preprocessing import MultiLabelBinarizer
from .models import Event, Tag

clf_ovr = Pipeline([('vect', CountVectorizer(stop_words='english', max_features=7000, max_df=.2)),
                ('tfidf', TfidfTransformer(use_idf=True)),
                ('clf', OneVsRestClassifier(SVC(kernel='linear')))])

INT_TO_TAG = []
TAG_TO_INT = {}

def add_tag(tag_id):

    '''
    a function docstring
    '''

    INT_TO_TAG.append(tag_id)
    TAG_TO_INT[tag_id] = len(INT_TO_TAG)

def refresh_tag():

    '''
    a function docstring
    '''

    global INT_TO_TAG, TAG_TO_INT
    INT_TO_TAG = []
    TAG_TO_INT = {}
    idx = 1

    for t_id in Tag.objects.values_list('id', flat=True):
        INT_TO_TAG.append(t_id)
        TAG_TO_INT[t_id] = idx
        idx += 1

def train_classifier():

    '''
    a function docstring
    '''

    events = [{
        'content': e.content, 'tag': e.tag.values_list('id', flat=True)
        } for e in Event.objects.prefetch_related('tag').order_by('-date')]

    event_limit = 100

    train_data = [event['content'] for event in events[:event_limit]]
    train_target = [[TAG_TO_INT[t] for t in event['tag']] for event in events[:event_limit]]
    if train_data:
        clf_ovr.fit(train_data, MultiLabelBinarizer().fit_transform(train_target))

def recommend_tag(content, num=3):

    '''
    a function docstring
    '''

    if Event.objects.count() <= 6 or Tag.objects.annotate(q_count=
        Count('tag_event')).filter(q_count__gte=1).count() <= 2:
        return []

    refresh_tag()

    train_classifier()

    predicted = clf_ovr.decision_function([content])
    pred_list = predicted.tolist()[0]
    pred2 = [[i, pred_list[i]] for i in range(len(pred_list))]
    pred2.sort(key=(lambda x: x[1]), reverse=True)
    pred3 = list(map(lambda x: x[0], pred2[:num]))
    #pre_result = list(zip(
    #    *heapq.nlargest(num, enumerate(pred_list[0]), key=operator.itemgetter(1))
    #))[0]
    #presult = list(map(lambda x: INT_TO_TAG[x], pre_result))
    result = list(map(lambda x: INT_TO_TAG[x], pred3))
    return result
