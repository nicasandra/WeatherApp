package com.endava.spring.service;

import com.endava.spring.model.City;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by nicasandra on 11/21/2016.
 */
@Service
public interface CityService {
    City create(City city);

    List<City> findByUser_id(Integer id);
}
