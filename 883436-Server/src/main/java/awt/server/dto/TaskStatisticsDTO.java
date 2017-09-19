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
public class TaskStatisticsDTO {
    private Integer available,
                accepted,
                rejected,
                annotated;

    public TaskStatisticsDTO(Integer available, Integer accepted, Integer rejected, Integer annotated) {
        this.available = available;
        this.accepted = accepted;
        this.rejected = rejected;
        this.annotated = annotated;
    }

    public Integer getAvailable() {
        return available;
    }

    public void setAvailable(Integer available) {
        this.available = available;
    }

    public Integer getAccepted() {
        return accepted;
    }

    public void setAccepted(Integer accepted) {
        this.accepted = accepted;
    }

    public Integer getRejected() {
        return rejected;
    }

    public void setRejected(Integer rejected) {
        this.rejected = rejected;
    }

    public Integer getAnnotated() {
        return annotated;
    }

    public void setAnnotated(Integer annotated) {
        this.annotated = annotated;
    }

}
