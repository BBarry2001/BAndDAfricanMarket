import re
from rest_framework import serializers
from .models import User

class UserLoginSerializer(serializers.ModelSerializer):
    """
    Serializer for user login.

    - Validates user email and password.
    - Performs basic format checks on the email and password.
    """
    email = serializers.EmailField(max_length=255)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password']

    def validate(self, data):
        # Validation logic for user login credentials
        email = data.get("email", "")
        password = data.get("password", "")

        # Basic email format validation
        if not ("@" in email and "." in email):
            raise serializers.ValidationError({"email": "Invalid email format"})

        # Password complexity validation
        if not any(char.islower() for char in password):
            raise serializers.ValidationError({"password": "Must contain at least one lowercase letter"})
        
        if not any(char.isupper() for char in password):
            raise serializers.ValidationError({"password": "Must contain at least one uppercase letter"})
        
        if not any(char.isdigit() for char in password):
            raise serializers.ValidationError({"password": "Must contain at least one number"})
        
        if not (8 <= len(password) <= 20):
            raise serializers.ValidationError({"password": "Must be between 8-20 characters long"})

        return data

class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration.

    - Handles data validation for new user registration.
    - Performs custom field-level validation.
    """
    phone_number = serializers.CharField(allow_null=True, required=False, max_length=12, min_length=12, allow_blank=True)

    # Custom validators for various fields. The code seems straight forward so i won't further include comments
    def validate_first_name(self, value):
        if not value.replace(" ", "").isalpha():
            raise serializers.ValidationError("First name can only contain alphabets and spaces. No special characters or numbers")
        return value

    def validate_last_name(self, value):
        if not value.replace(" ", "").isalpha():
            raise serializers.ValidationError("Last name can only contain alphabets and spaces. No special characters or numbers")
        return value
    
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with that email already exists.")
        return value

    def validate_phone_number(self, value):
        if value in [None, '', 'null']:  # Handling string 'null' if it's passed from the frontend
            return None
        if not re.match("^\d{3}-\d{3}-\d{4}$", value):
            raise serializers.ValidationError("Phone number must be in the format xxx-xxx-xxxx.")
        if User.objects.filter(phone_number=value.replace('-', '')).exists():
            raise serializers.ValidationError("A user with that phone number already exists.")
        return value.replace('-', '')  # Ensure that the phone number is saved without dashes. I want all digits for phone numbers

    def is_valid(self, raise_exception=False):
        """
        This method has been overridden to ensure field-level validation (like the one above for phone numbers) happens
        before model validation. By default, Django Rest Framework (DRF) first runs field-level validation, then .validate(),
        and then .create() or .update(). In our case, the phone number format "xxx-xxx-xxxx" was causing issues with the model
        validation since our model expected a length of 10 characters but was receiving 12 characters (due to the dashes).
        To resolve this, we're cleaning up the phone number here (removing dashes) after checking its validity.
        """
        is_valid = super().is_valid(raise_exception=raise_exception)
        
        # If the phone number is valid and not None or empty, clean it by removing dashes.
        if 'phone_number' in self.validated_data and self.validated_data['phone_number']:
            self.validated_data['phone_number'] = self.validated_data['phone_number'].replace('-', '')

        return is_valid

    def validate_password(self, value):
        import re
        if not re.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!#%*?&]{8,20}$", value):
            raise serializers.ValidationError(
                "Password must have 1 uppercase, 1 lowercase, 1 digit, and be 8-20 characters long.")
        return value

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password', 'phone_number', 'preferred_language']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        # Overridden create method for hashing password and handling phone number format
        phone_number = validated_data.get('phone_number', None)
        if phone_number == '':
            validated_data['phone_number'] = None  
        
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        print("user saved ")
        return user
