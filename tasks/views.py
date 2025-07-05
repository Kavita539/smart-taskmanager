from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.exceptions import ObjectDoesNotExist
from .models import Task, ContextEntry, Category
from .serializers import TaskSerializer, ContextEntrySerializer, CategorySerializer
from .ai_module import generate_task_suggestions, process_context_entries
import logging

logger = logging.getLogger(__name__)

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by('-created_at')
    serializer_class = TaskSerializer

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
            context_ids = request.data.get('context_ids', [])

            if not task_data or not context_ids:
                return Response(
                    {'error': 'Invalid input: "task" and "context_ids" are required.'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            context_entries = ContextEntry.objects.filter(id__in=context_ids)
            if not context_entries.exists():
                return Response(
                    {'error': 'No context entries found for the given IDs.'},
                    status=status.HTTP_404_NOT_FOUND
                )

            context_text = process_context_entries(context_entries)
            
            # Defensive: check if suggestion generation fails
            suggestion = generate_task_suggestions(task_data, context_text)
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
