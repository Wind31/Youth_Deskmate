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
from leancloud import User
from leancloud.errors import LeanCloudError
import json


class Info(Object):
    pass

lastTime = 0
firstTime = 0
count = 0
def index(request):
    return render(request, 'index.html', {})

def toquery(request):
    return render(request, 'main_query.html', {})

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

    if q2=='2.1':
        score = score + 5
    elif q2=='2.2':
        score = score + 10
    elif q2=='2.3':
        score = score + 15
    elif q2=='2.4':
        score = score + 20

    if q3=='3.1':
        score = score + 10
    elif q3=='3.2':
        score = score + 20
    elif q3=='3.3':
        score = score + 30
    elif q3=='3.4':
        score = score + 40

    if q4=='4.1':
        score = score - 3
    elif q4=='4.2':
        score = score - 6
    elif q4=='4.3':
        score = score - 9
    elif q4=='4.4':
        score = score - 12
    
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
            q1=Query('Info')
            q2=Query('Info')
            q1.equal_to('match',False)
            if sex=='male':
                sex='female'
            else:
                sex='male'
            q2.equal_to('sex',sex)
            q=Query.and_(q1,q2)
            q.limit(1000)
            q.select('score')
            q.add_ascending('createdAt')
            query_list=q.find()
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


def query(request):
    name = request.POST.get('name')
    if not name:
        return render(request, 'main_query.html', {})
    phone = request.POST.get('phone')
    info_id = request.POST.get('id')
    q1=Query('Info')
    q2=Query('Info')
    q3=Query('Info')
    q1.equal_to('id',info_id)
    q2.equal_to('name',name)
    q3.equal_to('phone',phone)
    q=Query.and_(q1,q2,q3)
    query_list=q.find()
    if len(query_list)<=0:
        return render(request, 'fail.html', {'msg':'没有找到你的信息，请确认是否填写正确，或许你还没有报名哦'})
    else:
        p1=query_list[0]
        isMatch=p1.get('match')
        if not isMatch:
            return render(request, 'nodeskmate.html', {'s_name':name,'s_id':info_id})
        else:
            match_object_id=p1.get('matchObject')
            q4=Query('Info')
            p2=q4.get(match_object_id)
            score1=p1.get('score')
            score2=p2.get('score')
            count=abs(score1-score2)
            match_rate=str(round((64-count)/64.0*100,2))+'%'
            match_name=p2.get('name')
            match_id=p2.get('id')
            match_sex=p2.get('sex')
            if(match_sex=='male'):
                match_sex='男'
            elif(match_sex=='female'):
                match_sex='女'
            match_qq=p2.get('qq')
            return render(request, 'select.html', {'s_name':name,'s_id':info_id,'rate':match_rate,'name':match_name,'id':match_id,'sex':match_sex,'qq':match_qq})


def nextpage(request):
    current_user=User.get_current()
    if not current_user:
        return HttpResponseRedirect('/login/')
    q=Query('Info')
    q.add_descending('createdAt')
    global lastTime
    global firstTime
    q.less_than('createdAt',lastTime)
    q.limit(20)
    res_list=q.find()
    if len(res_list)<=0:
        res_dict={'res':None,'success':False}
        return HttpResponse(json.dumps(res_dict))
    firstTime=res_list[0].get('createdAt')
    lastTime=res_list[-1].get('createdAt')
    res=[]
    global count
    for i in res_list:
            count=count-1
            isMatch=i.get('match')
            matchid='None'
            matchname='None'
            if isMatch:
                p=q.get(i.get('matchObject'))
                matchid=p.get('id')
                matchname=p.get('name')
            info={
                'no':count,
                'name':i.get('name'),
                'sex':i.get('sex'),
                'phone':i.get('phone'),
                'id':i.get('id'),
                'match':isMatch,
                'matchid':matchid,
                'matchname':matchname,
                'time':str(i.get('createdAt')),
                'objectid':i.id
            }
            res.append(info)
    res_dict={'res':res,'success':True}
    return HttpResponse(json.dumps(res_dict))
    
# def lastpage(request):
#     current_user=User.get_current()
#     if not current_user:
#         return HttpResponseRedirect('/login/')
#     q=Query('Info')
#     q.add_descending('createdAt')
#     global lastTime
#     global firstTime
#     q.greater_than('createdAt',firstTime)
#     q.limit(20)
#     res_list=q.find()
#     if len(res_list)<=0:
#         res_dict={'res':None,'success':False}
#         return HttpResponse(json.dumps(res_dict))
#     firstTime=res_list[0].get('createdAt')
#     lastTime=res_list[-1].get('createdAt')
#     res=[]
#     count=0
#     for i in res_list:
#             count=count+1
#             isMatch=i.get('match')
#             matchid='None'
#             matchname='None'
#             if isMatch:
#                 p=q.get(i.get('matchObject'))
#                 matchid=p.get('id')
#                 matchname=p.get('name')
#             info={
#                 'no':count,
#                 'name':i.get('name'),
#                 'sex':i.get('sex'),
#                 'phone':i.get('phone'),
#                 'id':i.get('id'),
#                 'match':isMatch,
#                 'matchid':matchid,
#                 'matchname':matchname,
#                 'time':str(i.get('createdAt')),
#                 'objectid':i.id
#             }
#             res.append(info)
#     res_dict={'res':res,'success':True}
#     return HttpResponse(json.dumps(res_dict))


def innerquery(request):
    current_user=User.get_current()
    if not current_user:
        return HttpResponseRedirect('/login/')
    q=Query('Info')
    q.limit(1000)
    thesum=q.count()
    q.add_descending('createdAt')
    q.limit(20)
    res_list=q.find()
    global lastTime
    lastTime=res_list[-1].get('createdAt')
    res=[]
    global count
    count=thesum+1
    for i in res_list:
        count=count-1
        isMatch=i.get('match')
        matchid='None'
        matchname='None'
        if isMatch:
            p=q.get(i.get('matchObject'))
            matchid=p.get('id')
            matchname=p.get('name')
        info={
            'no':count,
            'name':i.get('name'),
            'sex':i.get('sex'),
            'phone':i.get('phone'),
            'id':i.get('id'),
            'match':isMatch,
            'matchid':matchid,
            'matchname':matchname,
            'time':str(i.get('createdAt')),
            'objectid':i.id
        }
        res.append(info)
    return render(request, 'inner_query.html', {'infos':res,'sum':thesum})

def innerdelete(request):
    current_user=User.get_current()
    if not current_user:
        return HttpResponseRedirect('/login/')
    if request.method=='GET':
        json_data = request.GET['data']
        content=json.loads(json_data)
        objectid=content['objectid']
        if not objectid:
            return HttpResponse("no data")
        q=Query('Info')
        p1=q.get(objectid)
        if p1.get('match'):
            p2=q.get(p1.get('matchObject'))
            p2.set('match',False)
            p2.set('matchObject','None')
            try:
                p2.save()
            except:
                res={
                    'result':False,
                    'message':'系统异常，删除失败'
                }
                return HttpResponse(json.dumps(res))
        try:
            p1.destroy()
            res={
                    'result':True,
                    'message':'删除成功'
                }
            return HttpResponse(json.dumps(res))
            
        except:
                res={
                    'result':False,
                    'message':'系统异常，删除失败'
                }
                return HttpResponse(json.dumps(res))

def login(request):
    current_user=User.get_current()
    if current_user:
        current_user.logout()
    pwd = request.POST.get('pwd')
    if not pwd:
        return render(request, 'login.html',{})
    user=User()
    try:
        user.login('Youth',pwd)    
    except:
        return render(request, 'fail.html',{'msg':'密码错误'})
    current_user=User.get_current()
    if current_user is not None:
        return HttpResponseRedirect('/innerquery/')

def specificquery(request):
    current_user=User.get_current()
    if not current_user:
        return HttpResponseRedirect('/login/')
    if request.method=='GET':
        json_data = request.GET['data']
        content=json.loads(json_data)
        queryType=content['type']
        q=Query('Info')
        if queryType==1:
            name=content['name']
            q.equal_to('name',name)
        else:
            objId=content['id']
            q.equal_to('id',objId)
        result=q.find()
        if len(result)<=0:
            res_dict={'result':None,'success':False}
            return HttpResponse(json.dumps(res_dict))
        res_list=[]
        count=0
        for i in result:
            count=count+1
            isMatch=i.get('match')
            matchid='None'
            matchname='None'
            if isMatch:
                p=q.get(i.get('matchObject'))
                matchid=p.get('id')
                matchname=p.get('name')
            info={
                'no':count,
                'name':i.get('name'),
                'sex':i.get('sex'),
                'phone':i.get('phone'),
                'id':i.get('id'),
                'match':isMatch,
                'matchid':matchid,
                'matchname':matchname,
                'time':str(i.get('createdAt')),
                'objectid':i.id
            }
            res_list.append(info)
        res_dict={'result':res_list,'success':True}
    return HttpResponse(json.dumps(res_dict))
