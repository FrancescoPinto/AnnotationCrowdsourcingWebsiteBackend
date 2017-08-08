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
    private int available,
                accepted,
                rejected,
                annotated;

    public TaskStatisticsDTO(int available, int accepted, int rejected, int annotated) {
        this.available = available;
        this.accepted = accepted;
        this.rejected = rejected;
        this.annotated = annotated;
    }

    public int getAvailable() {
        return available;
    }

    public void setAvailable(int available) {
        this.available = available;
    }

    public int getAccepted() {
        return accepted;
    }

    public void setAccepted(int accepted) {
        this.accepted = accepted;
    }

    public int getRejected() {
        return rejected;
    }

    public void setRejected(int rejected) {
        this.rejected = rejected;
    }

    public int getAnnotated() {
        return annotated;
    }

    public void setAnnotated(int annotated) {
        this.annotated = annotated;
    }
    
}
