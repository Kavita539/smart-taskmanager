import django_filters
from .models import Task

class TaskFilter(django_filters.FilterSet):
    category = django_filters.NumberFilter(field_name='category_id')
    status = django_filters.CharFilter(field_name='status', lookup_expr='iexact')

    PRIORITY_CHOICES = (
        ("low", "Low"),
        ("medium", "Medium"),
        ("high", "High"),
    )

    priority_score = django_filters.ChoiceFilter(
        choices=PRIORITY_CHOICES, method='filter_by_priority_score'
    )

    def filter_by_priority_score(self, queryset, name, value):
        if value == "low":
            return queryset.filter(priority_score__lt=1)
        elif value == "medium":
            return queryset.filter(priority_score=1)
        elif value == "high":
            return queryset.filter(priority_score__gte=2)
        return queryset

    class Meta:
        model = Task
        fields = ['status', 'category', 'priority_score']

    def filter_queryset(self, queryset):
        print("Before filter:", queryset.query)
        qs = super().filter_queryset(queryset)
        print("After filter:", qs.query)
        return qs
