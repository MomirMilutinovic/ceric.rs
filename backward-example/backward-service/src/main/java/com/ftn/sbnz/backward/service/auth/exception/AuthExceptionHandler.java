package com.ftn.sbnz.backward.service.auth.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import com.ftn.sbnz.backward.service.auth.exception.OldPasswordDoesNotMatchException;
import com.ftn.sbnz.backward.service.errorhandling.ErrorMessage;

@ControllerAdvice
public class AuthExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler({OldPasswordDoesNotMatchException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    protected ResponseEntity<ErrorMessage> handleOldPasswordDoesNotMatchException(
            OldPasswordDoesNotMatchException e, final WebRequest webRequest) {
        return new ResponseEntity<>(new ErrorMessage(e.getMessage()), HttpStatus.BAD_REQUEST);
    }
}