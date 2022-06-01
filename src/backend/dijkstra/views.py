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

def enqueue(e, arr):
    i = 0
    while (i < len(arr) and int(e[0]) > int(arr[i][0])):
        i += 1
    arr.insert(i, e)
    return arr

def dequeue(arr):
    return arr.pop(0)

def isIn(src, processed):
    i = 0
    while (i < len(processed)):
        if (src == processed[i]):
            return True
        else:
            i += 1
    return False

def getDestination(processing, map, processed):
    result = []
    for i in range(len(map)):
        if (map[i]['src'] == processing[len(processing) - 1] and not(isIn(map[i]['dest'], processed))):
            dest = []
            dest.append(str(int(processing[0]) + int(map[i]['weight'])))
            for j in range(1, len(processing)):
                dest.append(processing[j])
            dest.append(map[i]['dest'])
            result.append(dest)
    return result

@csrf_exempt
def showMap(request):
    src = json.loads(request.body.decode('UTF-8'))["src"]
    dest = json.loads(request.body.decode('UTF-8'))["dest"]
    maps = json.loads(request.body.decode('UTF-8'))["map"]

    # DIJKSTRA ALGORITHM
    processed = []
    processing = ['0', src]
    pqueue = [['0', src]]
    while (len(pqueue) != 0 and processing[len(processing) - 1] != dest):
        processing = dequeue(pqueue)
        next_dest = getDestination(processing, maps, processed)
        for i in range(len(next_dest)):
            pqueue = enqueue(next_dest[i], pqueue)
        processed.append(processing[len(processing) - 1])
    if (processing[len(processing) - 1] == dest):
        return JsonResponse({'data': processing})
    else:
        return JsonResponse({'message': dest + ' tidak dapat dicapai dari ' + src})
    