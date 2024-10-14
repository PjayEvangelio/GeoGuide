from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Country
from .serializers import CountrySerializer

class CountryListView(APIView):
    def get(self, request):
        query = request.query_params.get('search', None)
        if query:
            countries = Country.objects.filter(name__icontains=query)       # Allows for case-insensitive search
        else:
            countries = Country.objects.all()
        serializer = CountrySerializer(countries, many=True)
        return Response(serializer.data)
