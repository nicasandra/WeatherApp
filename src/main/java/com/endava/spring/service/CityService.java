package com.endava.spring.service;

import com.endava.spring.model.City;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by nicasandra on 11/21/2016.
 */
@Service
public interface CityService {
    public City create(City city);

    public City delete(int id);

    public List<City> findAll();

    public City update(City city);

    public List<City> findById(Integer id);
}
