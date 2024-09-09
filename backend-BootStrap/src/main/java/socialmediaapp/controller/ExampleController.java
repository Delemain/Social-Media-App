package socialmediaapp;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ExampleController {

	@GetMapping("/example")
	public String example() {
		return "This is an example request";
	}

	@GetMapping("/example2")
	public String example2() {
		return "This is another example";
	}
}