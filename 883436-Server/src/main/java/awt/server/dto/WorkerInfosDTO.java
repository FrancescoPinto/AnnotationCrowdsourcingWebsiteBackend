/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.dto;

/**
 *
 * @author Utente
 */
public class WorkerInfosDTO {
    private Long id;
    private String fullname,
                   selection,
                   annotation;
    private boolean selector,
                    annotator;

    public WorkerInfosDTO(Long id, String fullname, String selection, String annotation, boolean selector, boolean annotator) {
        this.id = id;
        this.fullname = fullname;
        this.selection = selection;
        this.annotation = annotation;
        this.selector = selector;
        this.annotator = annotator;
    }
    
      public WorkerInfosDTO(WorkerDTO w, String selection, String annotation) {
        this.id = w.getId();
        this.fullname = w.getFullname();
        this.selection = selection;
        this.annotation = annotation;
        this.selector = w.isSelector();
        this.annotator = w.isAnnotator();
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getSelection() {
        return selection;
    }

    public void setSelection(String selection) {
        this.selection = selection;
    }

    public String getAnnotation() {
        return annotation;
    }

    public void setAnnotation(String annotation) {
        this.annotation = annotation;
    }

    public boolean isSelector() {
        return selector;
    }

    public void setSelector(boolean selector) {
        this.selector = selector;
    }

    public boolean isAnnotator() {
        return annotator;
    }

    public void setAnnotator(boolean annotator) {
        this.annotator = annotator;
    }
    
    
}
