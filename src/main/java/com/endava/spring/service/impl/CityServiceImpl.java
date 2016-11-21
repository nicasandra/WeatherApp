package com.endava.spring.service.impl;

import com.endava.spring.model.City;
import com.endava.spring.repository.CityRepository;
import com.endava.spring.service.CityService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by nicasandra on 11/21/2016.
 */

@Service
public class CityServiceImpl implements CityService {

    @Resource
    private CityRepository cityRepository;

    public City create(City city) {
        return cityRepository.save(city);
    }

    public City delete(int id) {
        return null;
    }

    public List<City> findAll() {
        return null;
    }

    public City update(City city) {
        return null;
    }

    public List<City> findById(Integer id) {
        return cityRepository.findByUser_id(id);
    }
}
