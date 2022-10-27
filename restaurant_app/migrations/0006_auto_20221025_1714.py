# Generated by Django 3.2.3 on 2022-10-25 11:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurant_app', '0005_alter_orders_initial_price'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customer',
            name='default',
        ),
        migrations.RemoveField(
            model_name='customer',
            name='pin',
        ),
        migrations.RemoveField(
            model_name='customer',
            name='state',
        ),
        migrations.RemoveField(
            model_name='customer',
            name='town',
        ),
        migrations.RemoveField(
            model_name='customer',
            name='village',
        ),
        migrations.AddField(
            model_name='customer',
            name='address',
            field=models.CharField(default='hf', max_length=200),
        ),
        migrations.AddField(
            model_name='customer',
            name='email',
            field=models.CharField(default='jhgg', max_length=500),
        ),
    ]