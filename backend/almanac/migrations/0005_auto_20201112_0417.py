# Generated by Django 3.1.2 on 2020-11-12 04:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('almanac', '0004_auto_20201112_0359'),
    ]

    operations = [
        migrations.AlterField(
            model_name='university',
            name='domain',
            field=models.CharField(max_length=30, unique=True),
        ),
    ]
