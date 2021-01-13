from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={
        'input_type': 'password'
    })

    password2 = serializers.CharField(
        write_only=True, label='Confirm password', style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']

        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        username = validated_data['username']
        email = validated_data['email']
        password = validated_data['password']
        password2 = validated_data['password2']

        if (email and User.objects.filter(email=email).exclude(username=username).exists()):
            raise serializers.ValidationError(
                {'email': 'Email address must be unique.'})

        if len(password) < 8:
            raise serializers.ValidationError({
                password: 'Password should be longer than 8 characters!'

            })

        if password != password2:
            raise serializers.ValidationError({
                password: 'Passwords do not match!'})

        user = User(username=username, email=email)

        user.set_password(password)

        user.save()

        return user
