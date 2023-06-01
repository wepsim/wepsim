/*
 * SPDX-FileCopyrightText: 2010-2022 Espressif Systems (Shanghai) CO LTD
 *
 * SPDX-License-Identifier: CC0-1.0
 */

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

void main(void);


// Falta el read string
int _myecall_c(int a0, int a1)
{
	int res = 0;
	char c;


        if (a0 == 1)   // print int
                printf(">%d\n", a1);
        
        if (a0 == 4)  // print string
		printf(">%s\n", (char *) a1);

        if (a0 == 11)  // print exit
		printf(">%c\n", a1);

        if (a0 == 5)  // read int
		scanf("%d", &res);

        if (a0 == 8){ // read string
		char *s;

		s = (char *) a1;
		scanf("%c", s);
		res = (int) s;
	}
	
        if (a0 == 12){ // read char
		//scanf("%c", &c);
		read(0, &c, 1);
		res = (int) c;
	}

	if (a0 == 10)
		_exit(0);

        return res;
}

int _esp_cpu_get_cycle_count(void) {
	return(esp_cpu_get_cycle_count());
}

void app_main(void)
{
    /////////// para leer del monitor
   // setvbuf(stdin, NULL, _IONBF, 0);
    //setvbuf(stdout, NULL, _IONBF, 0);
    ESP_ERROR_CHECK(uart_driver_install(CONFIG_ESP_CONSOLE_UART_NUM, 256, 0, 0, NULL, 0));
    esp_vfs_dev_uart_use_driver(CONFIG_ESP_CONSOLE_UART_NUM);
    esp_vfs_dev_uart_port_set_rx_line_endings(CONFIG_ESP_CONSOLE_UART_NUM, ESP_LINE_ENDINGS_CR);
    esp_vfs_dev_uart_port_set_tx_line_endings(CONFIG_ESP_CONSOLE_UART_NUM, ESP_LINE_ENDINGS_CRLF);
    /////////

 
    printf("Started program...\n");
    printf("------------------\n");

    int x = esp_cpu_get_cycle_count();

    main();
 
    x= esp_cpu_get_cycle_count() - x ;

    printf("Finished program: %d cycles \n", x);
    printf("------------------\n");

    return;

}

