# Generated by Django 3.2.3 on 2022-10-25 12:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('restaurant_app', '0007_customer_pin'),
    ]

    operations = [
        migrations.RenameField(
            model_name='customer',
            old_name='User',
            new_name='user',
        ),
    ]
