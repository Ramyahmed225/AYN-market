# Generated by Django 3.1.4 on 2023-04-28 14:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('carts', '0003_cart_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cartitems',
            old_name='prducts',
            new_name='product',
        ),
    ]
