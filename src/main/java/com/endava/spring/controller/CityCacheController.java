package com.endava.spring.controller;

import com.endava.spring.model.CityCache;
import com.endava.spring.service.CityCacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by nicasandra on 12/2/2016.
 */
@Controller
@RequestMapping("/cache")
public class CityCacheController {

    @Autowired
    private CityCacheService cityCacheService;

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public CityCache insert(@RequestBody CityCache cityCache) {
        return cityCacheService.create(cityCache);
    }

    @RequestMapping(value = "/get", method = RequestMethod.POST)
    @ResponseBody
    public List<CityCache> get(@RequestBody CityCache cityCache) {
        return cityCacheService.findByNameContaining(cityCache.getName());
    }
}
