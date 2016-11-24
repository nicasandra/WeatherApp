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

    @RequestMapping("/delete/{idCity}")
    @ResponseBody
    public void deleteCity(@PathVariable Integer idCity){
        cityService.delete(idCity);
    }
}
