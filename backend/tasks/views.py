from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.exceptions import ObjectDoesNotExist
from .models import Task, ContextEntry, Category
from .serializers import TaskSerializer, ContextEntrySerializer, CategorySerializer
from .ai_module import generate_task_suggestions, process_context_entries
from .filters import TaskFilter
from django_filters.rest_framework import DjangoFilterBackend
import logging

logger = logging.getLogger(__name__)

from .filters import TaskFilter  # import your filter class

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by('-created_at')
    serializer_class = TaskSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = TaskFilter


class ContextEntryViewSet(viewsets.ModelViewSet):
    queryset = ContextEntry.objects.all().order_by('-timestamp')
    serializer_class = ContextEntrySerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class AISuggestionsAPIView(APIView):
    def post(self, request):
        try:
            task_data = request.data.get('task')

            if not task_data:
                return Response(
                    {'error': 'Invalid input: "task" and "context_ids" are required.'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Defensive: check if suggestion generation fails
            suggestion = generate_task_suggestions(task_data)
            if suggestion is None:
                return Response(
                    {'error': 'Failed to generate suggestions.'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            return Response({'suggestion': suggestion})

        except Exception as e:
            # Log the exception details for debugging
            logger.error(f"Error in AISuggestionsAPIView.post: {e}", exc_info=True)
            return Response(
                {'error': 'An unexpected error occurred.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
