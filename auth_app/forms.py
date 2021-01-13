from django import forms


class TodoForm(forms.Form):
    title = forms.CharField(max_length=100)
    completed = forms.BooleanField(default=False)
    created = forms.DateTimeField(auto_now_add=True)
