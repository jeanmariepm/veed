from django.urls import path
from rest_framework import routers
from .api import DealViewSet
from . import views

app_name = "games"


router = routers.DefaultRouter()
router.register("api/deals", DealViewSet, "deals")


urlpatterns = router.urls
