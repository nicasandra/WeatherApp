package com.endava.spring.controller;

import com.endava.spring.model.City;
import com.endava.spring.model.User;
import com.endava.spring.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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

    @RequestMapping("/create")
    @ResponseBody
    public City create(@RequestBody City city) {
        return cityService.create(city);
    }

    @RequestMapping("/listByUser")
    @ResponseBody
    public List<City> listByUser(@RequestBody User user) {
        return cityService.findByUser_id(user.getId());
    }
}
