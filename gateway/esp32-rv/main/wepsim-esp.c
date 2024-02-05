
/*
 * SPDX-FileCopyrightText: 2010-2022 Espressif Systems (Shanghai) CO LTD
 *
 * SPDX-License-Identifier: CC0-1.0
 */

 // based on the blink_example_main.c source code

#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <inttypes.h>
#include "sdkconfig.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_chip_info.h"
#include "esp_flash.h"
#include "driver/uart.h"
#include "esp_cpu.h"

//////////////////////// para leer del monitor
#include "esp_system.h"
#include "esp_console.h"
#include "esp_vfs_dev.h"
#include "esp_vfs_fat.h"
////////////////////////

/// Misceláneo
#include "esp_sleep.h"
#include "esp_random.h"
#include "driver/gpio.h"

void main(void);

// components/esp_hw_support/include/esp_random.h
int _wepsim_random ()
{
   return (int)esp_random();
}

void _wepsim_random_array (void * arr, size_t siz)
{
   return esp_fill_random(arr, siz);
}

int _rdcycle ()
{
   return esp_cpu_get_cycle_count();
}

void app_main(void)
{
  /////////// para leer del monitor
  ESP_ERROR_CHECK(uart_driver_install(CONFIG_ESP_CONSOLE_UART_NUM, 256, 0, 0, NULL, 0));
  esp_vfs_dev_uart_use_driver(CONFIG_ESP_CONSOLE_UART_NUM);
  esp_vfs_dev_uart_port_set_rx_line_endings(CONFIG_ESP_CONSOLE_UART_NUM, ESP_LINE_ENDINGS_CR);
  esp_vfs_dev_uart_port_set_tx_line_endings(CONFIG_ESP_CONSOLE_UART_NUM, ESP_LINE_ENDINGS_CRLF);
  /////////
 
  setvbuf(stdout, NULL, _IONBF, 0);

  printf("Program starts\n");
  printf("--------------\n");

  int x = esp_cpu_get_cycle_count();
  main();
  x = esp_cpu_get_cycle_count() - x ;

  printf("Program ends: %d cycles \n", x);
  printf("-------------------\n");
}

