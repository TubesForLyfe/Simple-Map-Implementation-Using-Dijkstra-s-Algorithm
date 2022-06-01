from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json

# Create your views here.
@csrf_exempt
def createMap(request):
    map = json.loads(request.body.decode('UTF-8'))["map"]
    map_split = map.split('\n')
    map_result = []
    for i in range(len(map_split)):
        map_dict_split = map_split[i].split(' ')
        map_dict_result = dict()
        map_dict_result['src'] = map_dict_split[0]
        map_dict_result['dest'] = map_dict_split[1]
        map_dict_result['weight'] = map_dict_split[2].split('\r')[0]
        map_result.append(map_dict_result)
    return JsonResponse({'data': map_result}) 

@csrf_exempt
def showMap(request):
    src = json.loads(request.body.decode('UTF-8'))["src"]
    dest = json.loads(request.body.decode('UTF-8'))["dest"]
    maps = json.loads(request.body.decode('UTF-8'))["map"]

    #PROCESS
    print(maps)