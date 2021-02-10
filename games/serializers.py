from rest_framework import serializers
from games.models import Deal 

class DealSerializer(serializers.ModelSerializer):
  class Meta:
    model = Deal 
    fields = '__all__'