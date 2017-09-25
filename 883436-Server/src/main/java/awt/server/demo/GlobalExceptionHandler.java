package awt.server.demo;


import awt.server.dto.ErrorDTO;
import awt.server.exceptions.FailedToLoginException;
import awt.server.exceptions.UserCreationException;
import awt.server.exceptions.UserNotLogged;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.security.SignatureException;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class GlobalExceptionHandler {
    
    private MessageSource messageSource;
    
    @Autowired
    public GlobalExceptionHandler(MessageSource messageSource){
        this.messageSource = messageSource;
    }
    
    //@ResponseStatus(NOT_FOUND)
    //@ExceptionHandler(ProfileNotFoundException.class)
    //public void profileNotFound() {
    //}

    @ResponseStatus(NOT_FOUND)
    @ExceptionHandler(FailedToLoginException.class)
    public ResponseEntity<ErrorDTO> failedToLogin(FailedToLoginException ex) {
        ErrorDTO response = new ErrorDTO(ex.getMessage());
        return new ResponseEntity<ErrorDTO>(response, HttpStatus.NOT_FOUND);
    }

     @ResponseStatus(BAD_REQUEST)
    @ExceptionHandler(UserCreationException.class)
    public ResponseEntity<ErrorDTO> failedTo(UserCreationException ex) {
        ErrorDTO response = new ErrorDTO(ex.getMessage());
        return new ResponseEntity<ErrorDTO>(response, HttpStatus.BAD_REQUEST);
    }

    
    
    @ResponseStatus(FORBIDDEN)
    @ExceptionHandler(SignatureException.class)
    public void failedToVerify() {
        System.out.println("");
    }
    
    @ResponseStatus(FORBIDDEN)
    @ExceptionHandler(UserNotLogged.class)
    public void notLogged(){
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public List<ErrorDTO> processValidationError(MethodArgumentNotValidException ex){
        BindingResult result = ex.getBindingResult();
        List<FieldError> fieldErrors = result.getFieldErrors();
        return processFieldErrors(fieldErrors);
    }
    
    private List<ErrorDTO> processFieldErrors(List<FieldError> fieldErrors){
        List<ErrorDTO> dto = new ArrayList<ErrorDTO>();
        for(FieldError fieldError:fieldErrors){
            String localizedErrorMessage = resolveLocalizedErrorMessage(fieldError);
            dto.add(new ErrorDTO(fieldError.getField()+localizedErrorMessage));
        }
        return dto;
    }
    
    private String resolveLocalizedErrorMessage(FieldError fieldError){
        Locale currentLocale = LocaleContextHolder.getLocale();
        String localizedErrorMessage = messageSource.getMessage(fieldError,currentLocale);
        
        if(localizedErrorMessage.equals(fieldError.getDefaultMessage())){
            String[] fieldErrorCodes = fieldError.getCodes();
            localizedErrorMessage = fieldErrorCodes[0];
        }
        
        return localizedErrorMessage;
    }   
}
