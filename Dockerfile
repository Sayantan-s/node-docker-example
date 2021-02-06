FROM python

WORKDIR /pythonapp

COPY . /pythonapp

CMD ["python","checkmaxmin.py"]