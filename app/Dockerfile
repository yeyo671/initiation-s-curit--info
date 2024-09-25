# Utiliser une image Python pour le container
FROM python:3.9

# Installer les dépendances
RUN pip install flask mysql-connector-python

# Copier le contenu de l'application
COPY . /app

# Définir le répertoire de travail
WORKDIR /app

# Exposer le port de Flask
EXPOSE 5000

# Lancer l'application
CMD ["python", "app.py"]
