# Generated by Django 5.0 on 2024-05-27 07:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_remove_order_shippingcode'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='shippingCode',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
