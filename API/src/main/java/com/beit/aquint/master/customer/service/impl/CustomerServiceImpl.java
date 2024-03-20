package com.beit.aquint.master.customer.service.impl;

import com.beit.aquint.common.config.exception.AquintCommonException;
import com.beit.aquint.common.config.responses.ResponseMessage;
import com.beit.aquint.common.dto.PaginationRequestDto;
import com.beit.aquint.common.service.PageUtilService;
import com.beit.aquint.master.customer.entity.Customer;
import com.beit.aquint.master.customer.repository.CustomerRepository;
import com.beit.aquint.master.customer.service.CustomerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@Slf4j
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    PageUtilService pageUtilService;

    @Override
    public ResponseMessage addNewCustomer(Customer customer) throws AquintCommonException {
        try {
            return new ResponseMessage("Customer saved/updated successfully", customerRepository.save(customer));
        } catch (Exception exception) {
            throw new AquintCommonException("Customer Not Saved Properly");
        }
    }

    @Override
    public List<Customer> getAllCustomer() throws AquintCommonException {

        try {
            return customerRepository.findAll();
        } catch (Exception exception) {
            throw new AquintCommonException("Customer Not Saved Properly");
        }        }

    @Override
    public Customer getCustomerByID(Long id) throws AquintCommonException {
        try {
            return customerRepository.findCustomerById(id);
        } catch (Exception exception) {
            throw new AquintCommonException("Customer Not fetched Properly");
        }       }

    @Override
    public Page<Customer> getCustomersPage(PaginationRequestDto paginationRequestDto) throws AquintCommonException {
        try {
            log.debug("Page Data Creating");
            Pageable pageable = pageUtilService.getPageable(paginationRequestDto);
            if (Objects.nonNull(paginationRequestDto.getSearchBy())) {
                return customerRepository.findCustomersPageWithSearch(pageable, paginationRequestDto.getSearchBy());
            } else {
                return customerRepository.findCustomersPageWithoutSearch(pageable);
            }
        } catch (Exception ex) {
            throw new AquintCommonException("Product Not fetch Properly");
        }
    }
}
