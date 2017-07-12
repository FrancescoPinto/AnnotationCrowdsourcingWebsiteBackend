package awt.server.model;

import java.io.Serializable;

public class Car implements Serializable {

	private static final long serialVersionUID = -6864691508555733684L;
		
	private String model;
	
	private int number;
	
	public Car(String aModel, Integer aNumber) {
		this.model=aModel;
		this.number=aNumber;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public int getNumber() {
		return number;
	}

	public void setNumber(int number) {
		this.number = number;
	}
	
	
}
