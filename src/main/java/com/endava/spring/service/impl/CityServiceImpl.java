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

    public List<City> findByUser_id(Integer id) {
        return cityRepository.findByUser_id(id);
    }
}
