# coding: utf-8

from django.conf.urls import url
from django.views import static

import views

urlpatterns = [
    url(r'^$', views.index),
    #url(r'^todos/?$', views.submit),
    url(r'^match/?$', views.match),
    url(r'^query/?$', views.query),
    url(r'^toquery/?$', views.toquery),
    url(r'^innerquery/?$', views.innerquery),
    url(r'^innerdelete/?$', views.innerdelete),
    url(r'^login/?$', views.login),
    url(r'^next/?$', views.nextpage),
    #url(r'^last/?$', views.lastpage),
    url(r'^specificquery/?$', views.specificquery),
    url(r'^static/(?P<path>.*)$', static.serve, {'document_root': 'static'}),
]
