# Generated by Django 2.1.2 on 2018-10-21 13:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('djbr', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Author',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('books', models.ManyToManyField(to='djbr.Book')),
            ],
        ),
    ]