from django.urls import path
from .views import signup, login, user_profile, logout, google_login

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', login, name='login'),
    path('profile/', user_profile, name='user_profile'),
    path('logout/', logout, name='logout'),
    path('google/login/', google_login, name='google_login'),
]

