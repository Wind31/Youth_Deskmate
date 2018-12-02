# coding: utf-8

from datetime import datetime

from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.http import HttpResponseServerError
from django.shortcuts import render
from django.urls import reverse
from django.views import View
from leancloud import Object
from leancloud import Query
from leancloud.errors import LeanCloudError
import json


class Info(Object):
    pass


def index(request):
    return render(request, 'index.html', {})


def submit(request):
    name = request.POST.get('name')
    if not name:
        return render(request, 'index.html', {})
    phone = request.POST.get('phone')
    sex = request.POST.get('sex')
    info_id = request.POST.get('id')
    qq = request.POST.get('qq')
    q=Query('Info')
    q.equal_to('id',info_id)
    query_list=q.find()
    if len(query_list)>0:
        return render(request, 'fail.html', {'msg':'该学号已存在，请勿重复提交，如有问题请联系有思'})
    q1 = request.POST.get('q1')
    q2 = request.POST.get('q2')
    q3 = request.POST.get('q3')
    q4 = request.POST.get('q4')
    score = 0
    if q1=='1.1':
        score = score + 1
    elif q1=='1.2':
        score = score + 3
    elif q1=='1.3':
        score = score + 5
    elif q1=='1.4':
        score = score + 7
    elif q1=='1.5':
        score = score + 9
    elif q1=='1.6':
        score = score + 11
    print score

    if q2=='2.1':
        score = score + 5
    elif q2=='2.2':
        score = score + 10
    elif q2=='2.3':
        score = score + 15
    elif q2=='2.4':
        score = score + 20
    print score

    if q3=='3.1':
        score = score + 10
    elif q3=='3.2':
        score = score + 20
    elif q3=='3.3':
        score = score + 30
    elif q3=='3.4':
        score = score + 40
    print score

    if q4=='4.1':
        score = score - 3
    elif q4=='4.2':
        score = score - 6
    elif q4=='4.3':
        score = score - 9
    elif q4=='4.4':
        score = score - 12
    print score 
    
    info = Info()
    info.set('name',name)
    info.set('phone',phone)
    info.set('sex',sex)
    info.set('id',info_id)
    info.set('q1',q1)
    info.set('q2',q2)
    info.set('q3',q3)
    info.set('q4',q4)
    info.set('qq',qq)
    info.set('score',score)
    info.set('match',False)
    info.set('matchObject','None')
    try:
        info.save()
    except LeanCloudError as e:
        return render(request, 'fail.html', {'msg':e.error})
    return render(request, 'success.html', {'object_id':info.id,'sex':sex,'score':score})

def match(request):
    try:
        if request.method=='GET':
            json_data = request.GET['data']
            content=json.loads(json_data)
            object_id=content['object_id']
            sex=content['sex']
            score=content['score']
            print score
            q1=Query('Info')
            q2=Query('Info')
            q1.equal_to('match',False)
            print sex
            if sex=='male':
                sex='female'
            else:
                sex='male'
            q2.equal_to('sex',sex)
            q=Query.and_(q1,q2)
            q.limit(1000)
            q.select('score')
            query_list=q.find()
            print len(query_list)
            if len(query_list)>0:
                count = 10000
                match_id = 0 
                for i in query_list:
                    temp_score = i.get('score')
                    if abs(score-temp_score)<count:
                        count=abs(score-temp_score)
                        match_id = i.id
                q3=Query('Info')
                match_res=True
                temp_rate=round((64-count)/64.0*100,2)
                if temp_rate<50.0:
                    match_res=False
                if match_res:
                    info1=q3.get(match_id)
                    info2=q3.get(object_id)
                    info1.set('match',True)
                    info1.set('matchObject',info2.id)
                    info2.set('match',True)
                    info2.set('matchObject',info1.id)
                    info1.save()
                    info2.save()
                match_rate=str(round((64-count)/64.0*100,2))+'%'
                match_name=info1.get('name')
                match_id=info1.get('id')
                match_sex=info1.get('sex')
                if(match_sex=='male'):
                    match_sex='男'
                elif(match_sex=='female'):
                    match_sex='女'
                match_qq=info1.get('qq')

            else:
                match_res=False
                match_rate='0%'
                match_name=None
                match_id=None
                match_sex=None
                match_qq=None
            res_dict={'res':match_res,'rate':match_rate,'name': match_name,'id':match_id,'sex':match_sex,'qq':match_qq}
            return HttpResponse(json.dumps(res_dict))
    except :
        res_dict={'res':False,'rate':None,'name': None,'id':None,'sex':None,'qq':None}
        return HttpResponse(json.dumps(res_dict))

# def query(request):
#     q=Query('Info')
#     res_list=q.find()
#     res=[]
#     count=0
#     for i in res_list:
#         count=count+1
#         info={
#             'no':count,
#             'name':i.get('name'),
#             'sex':i.get('sex'),
#             'phone':i.get('phone'),
#             'id':i.get('id'),
#             'q1':i.get('q1'),
#             'q2':i.get('q2'),
#             'q3':i.get('q3'),
#             'q4':i.get('q4'),
#         }
#         print info
#         res.append(info)
#     return render(request, 'query.html', {'infos':res})

# def update(request):
#     if request.method=='GET':
#         json_data = request.GET['data']
#         content=json.loads(json_data)
#         zero=content['zero']
#         print zero
#         # sex=content[1]['sex']
#         # one=content[2]['one']
#         # two=content[3]['two']
#         # three=content[4]['three']
#         # four=content[5]['four']
#         #如果数据库中不存在用户名
#         alert_dic={'alert_info':'hello'}
#         return HttpResponse(json.dumps(alert_dic))