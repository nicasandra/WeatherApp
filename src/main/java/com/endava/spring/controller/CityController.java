package com.endava.spring.controller;

import com.endava.spring.model.City;
import com.endava.spring.model.User;
import com.endava.spring.service.CityService;
import com.endava.spring.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import java.util.List;

/**
 * Created by nicasandra on 11/21/2016.
 */
@Controller
@RequestMapping("/city")
public class CityController {

    @Autowired
    private CityService cityService;

    @Autowired
    private UserService userService;

    @RequestMapping("/create/{idUser}")
    @ResponseBody
    public City create(@RequestBody City city, @PathVariable Integer idUser) {
        User user = userService.findOne(idUser);
        city.setUser(user);
        return cityService.create(city);
    }

    @RequestMapping("/listByUser")
    @ResponseBody
    public List<City> listByUser(@RequestBody User user) {
        return cityService.findByUser_id(user.getId());
    }

    @RequestMapping("/getWeather/{city}")
    @ResponseBody
    public String getWeather(@PathVariable String city) {
        RestTemplate restTemplate = new RestTemplate();
        String data=restTemplate.getForObject("http://api.worldweatheronline.com/premium/v1/weather.ashx?q=" + city +
                        "&key=d955d43298874365b29132322162511&format=json&num_of_days=3&tp=24", String.class);
        return data;
    }

    @RequestMapping("/delete/{idCity}")
    @ResponseBody
    public void deleteCity(@PathVariable Integer idCity) {
        cityService.delete(idCity);
    }
}
