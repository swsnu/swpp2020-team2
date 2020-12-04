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
from .models import Event

clf_ovr = Pipeline([('vect', CountVectorizer(stop_words='english',max_features=7000,max_df=.15)),
                ('tfidf', TfidfTransformer(use_idf=True)),
                ('clf', OneVsRestClassifier(SVC(kernel='linear')))])

def recommend_tag(content, num=3):
    events = [{
        'name': b.name, 'tag': b.tag.values_list('id', flat=True)
        } for b in Event.objects.prefetch_related('tag')]

    train_data = [event['name'] for event in events]
    train_target = [event['tag'] for event in events]
    clf_ovr.fit(train_data, MultiLabelBinarizer().fit_transform(train_target))
    predicted = clf_ovr.decision_function([content])
    return list(zip(*heapq.nlargest(num, enumerate(predicted), key=operator.itemgetter(1))))[0]
