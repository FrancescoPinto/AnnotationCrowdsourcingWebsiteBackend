package awt.server.controller;

import awt.server.model.Car;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;




@RestController
public class CarController{

	
	@RequestMapping(value="/car", method = RequestMethod.GET)
	public List<Car> getCars(){
		List<Car> cars= new ArrayList<Car>();
		cars.add(new Car("model1", 1));
		cars.add(new Car("model2", 12));
		return cars;
	}
	
	@RequestMapping(value="/car2", method= RequestMethod.GET)
	public ResponseEntity<List<Car>> getCars2(){
		List<Car> cars= new ArrayList<Car>();
		cars.add(new Car("model3", 123));
		cars.add(new Car("model4", 1234));
		return ResponseEntity.ok(cars);
	}
	

}
