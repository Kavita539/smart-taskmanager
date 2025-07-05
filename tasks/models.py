from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100)
    usage_count = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class ContextEntry(models.Model):
    content = models.TextField()
    source_type = models.CharField(max_length=50)
    timestamp = models.DateTimeField(auto_now_add=True)
    processed_insights = models.JSONField(default=dict)

    def __str__(self):
        return f"{self.source_type @ self.timestamp}"

class Task(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed')
    ]

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    Category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    priority_score = models.FloatField(default=0)
    deadline = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
