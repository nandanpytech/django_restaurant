# Generated by Django 3.2.3 on 2022-10-24 19:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurant_app', '0003_orders_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='orders',
            name='initial_price',
            field=models.ImageField(default=1, upload_to=''),
        ),
    ]