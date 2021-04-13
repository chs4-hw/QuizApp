from django.shortcuts import render

# Create your views here.


def index(request):
    return render(request, r"frontend_host/index.html")
