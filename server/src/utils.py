import datetime as dt


def current_datetime() -> dt.datetime:
    '''Returns current date and time replacing microseconds'''

    return dt.datetime.utcnow().replace(microsecond=0)
