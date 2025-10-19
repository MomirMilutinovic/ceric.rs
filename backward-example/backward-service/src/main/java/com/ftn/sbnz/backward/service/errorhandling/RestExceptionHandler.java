package com.ftn.sbnz.backward.service.errorhandling;

import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.List;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        List<ObjectError> errorList = ex.getBindingResult().getAllErrors();
        StringBuilder sb = new StringBuilder("Request finished with validation errors: \n");

        for (ObjectError error : errorList ) {
            if (error instanceof FieldError) {
                FieldError fe = (FieldError) error;
                sb.append(fe.getField() + " - ");
            }
            sb.append(error.getDefaultMessage()+ "\n\n");
        }

        return new ResponseEntity<>(sb.toString(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler ({ConstraintViolationException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    protected ResponseEntity<ErrorMessage> handleConstraintViolationException(
            ConstraintViolationException e, final WebRequest webRequest) {
        return new ResponseEntity<>(new ErrorMessage(e.getMessage()), HttpStatus.BAD_REQUEST);
    }
}