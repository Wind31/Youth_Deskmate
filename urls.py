# coding: utf-8

from django.conf.urls import url
from django.views import static

import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^todos/?$', views.submit),
    url(r'^match/?$', views.match),
    url(r'^static/(?P<path>.*)$', static.serve, {'document_root': 'static'}),
]
