from rest_framework import serializers
from .models import Task, ContextEntry, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class ContextEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContextEntry
        fields = "__all__"

class TaskSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', write_only=True, required=False
    )

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'category', 'category_id', 'priority_score', 'deadline', 'status', 'created_at', 'updated_at']

    def create(self, validated_data):
        category = validated_data.pop('category', None)  # category is from 'source' of category_id
        # Now create the Task with category set correctly
        task = Task.objects.create(**validated_data)
        if category:
            task.category = category
            task.save()
        return task

        