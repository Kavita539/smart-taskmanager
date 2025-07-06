from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, ContextEntryViewSet, CategoryViewSet, AISuggestionsAPIView

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)
router.register(r'contexts', ContextEntryViewSet)
router.register(r'categories', CategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('ai/suggestions/', AISuggestionsAPIView.as_view(), name='ai-suggestions'),
]