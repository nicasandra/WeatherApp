package com.endava.spring.controller;

import com.endava.spring.model.City;
import com.endava.spring.model.User;
import com.endava.spring.service.CityService;
import com.endava.spring.service.UserService;
import com.endava.spring.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Nick on 11/19/2016.
 */

@Controller
@RequestMapping("user/")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private CityService cityService;

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ResponseBody
    public User create(@RequestBody User user) {
        return userService.create(user);
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public List<User> list() {
        return userService.findAll();
    }

    @RequestMapping(value = "/{id}/cities")
    @ResponseBody
    public List<City> cityList(@PathVariable("id") Integer id) {
        return cityService.findById(id);
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    @ResponseBody
    public User register(@RequestBody User user) {
        User u = userService.register(user);
        System.out.println(u);
        return u;
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public User login(@RequestBody User user) {
        return userService.login(user);
    }

}
